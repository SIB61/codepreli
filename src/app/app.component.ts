import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location, Project } from './models/models';
import { base_url } from './constants';
import projectJson from './data.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , AfterViewInit{
@ViewChildren(MapInfoWindow) infoWindows: QueryList<MapInfoWindow>;
@ViewChild(GoogleMap) map!: GoogleMap;
issueForm:FormGroup
  constructor(private http:HttpClient,fb:FormBuilder){
     this.issueForm = fb.group({
       name:["",[Validators.required]],
       address:['',Validators.required],
       report:['',Validators.required]
     })
  }

  postIssue(){
    let data = this.issueForm.value
    data.projectId = this.detailesIndex
    console.log(data)
    // this.http.post("http:localhost:3000/issue",data).subscribe()       
  }

  projects:Project[] = []

  center:google.maps.LatLngLiteral
  isShowDetails = false
  projects$:Observable<any[]> = this.http.get<any[]>("http://localhost:3000/projects")
  ngOnInit(): void {
   navigator.geolocation.getCurrentPosition((p)=>{
      this.center = {lat:p.coords.latitude,lng:p.coords.longitude}
      console.log(this.center)
    }) 

  this.projects = projectJson

  }



  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  openInfoWindow(marker: MapMarker,i:number) {
    this.infoWindows.forEach((window,idx)=>{
      if(idx==i) window.open(marker)
    });
  }

  showDetails(i:number){
   this.isShowDetails = true;
   this.detailesIndex = i
  }

  detailesIndex = 0;

  catagory : string = ""

  selectedCar: number;

  cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab' },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ];

  changeCatagory(){

  }


  getPosition(position:Location):google.maps.LatLngLiteral{
    return  {lat: position.latitude,lng: position.logitude}
  }

ngAfterViewInit(){
}



}

