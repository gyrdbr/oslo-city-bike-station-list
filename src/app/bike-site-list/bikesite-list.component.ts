import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { BysykkelService } from '../bysykkel.service';
import { switchMap } from 'rxjs/operators';

interface StationStatus {
  is_installed: number;
  is_renting: number;
  num_bikes_available: number;
  num_docks_available: number;
  last_reported: number;
  is_returning: number;
  station_id: string;
}

interface DisplayStatus {
  name: string;
  num_bikes_available: number;
  num_docks_available: number;
  last_reported: number;
}

@Component({
  selector: 'app-bikesite-list',
  templateUrl: './bikesite-list.component.html',
  styleUrls: ['./bikesite-list.component.scss']
})
export class BikesiteListComponent implements OnInit, OnDestroy {

  public statusList = Array(); /* sorted list of sites with statuses and names */
  private subscription: Subscription;

  constructor(
    private bysykkelService: BysykkelService
  ) { }

  ngOnInit() {
    /* get static list of stations once */
    this.subscription = this.bysykkelService.getBikeSites()
      .subscribe(res1 => {
        if (res1.data && res1.data.stations) {
          const stations = res1.data.stations;
          // recheck status data every 10 seconds
          timer(0, 10000).pipe(
            switchMap(() => this.bysykkelService.getBikeSiteStatus())
          ).subscribe(res2 => {
            if (res2.data && res2.data.stations) {
              this.statusList = this.createStatusList(res2.data.stations, stations);
            }
          });
        }
      });
  }

  /**
   * Create a sorted list of statuses to be displayed in the template
   * @param statuses - an array of station status objects
   * @param stations - an array of station information objects
   * @returns returns a sorted list of station objects containing station name and availability status
   */
  private createStatusList(statuses: Array<StationStatus>, stations: Array<any>): Array<DisplayStatus> {
    const statusList = Array();
    statuses.forEach(elem => {
      statusList.push(this.createStatusElem(elem, this.getStationNameFromId(elem.station_id, stations)));
    });

    // sort the list on the names of the stations for readability
    statusList.sort((selem1, selem2) => {
      return selem1.name.localeCompare(selem2.name);
    });
    return statusList;
  }

  /**
   * Get the name of a station from its id
   * @param id - the station id
   * @param stations - an array of station information objects
   * @returns returns the name of the station
   */
  private getStationNameFromId(id: string, stations): string {
    const nameElem = stations.find(elem => {
      return elem.station_id && elem.station_id === id;
    });
    if (nameElem && nameElem.name) {
      return nameElem.name;
    } else {
      return '';
    }
  }

  /**
   * Create a status object containing station name and availability status
   * @param elem - a station status object
   * @param stName - the name of a station
   * @returns returns a status object containing station name and availability status
   */
  private createStatusElem(elem: StationStatus, stName: string): DisplayStatus {
    return {
      name: stName,
      num_bikes_available: elem.num_bikes_available,
      num_docks_available: elem.num_docks_available,
      last_reported: elem.last_reported
    };
  }

  /**
   * Used in template for setting css class indicating availability
   * @param num - number of available bikes or docks
   * @returns returns a class name for styling purposes
   */
  public getAvailability(num: number): string {
    if (num === 0) {
      return 'none';
    } else if (num <= 2) {
      return 'limited';
    } else {
      return 'available';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
