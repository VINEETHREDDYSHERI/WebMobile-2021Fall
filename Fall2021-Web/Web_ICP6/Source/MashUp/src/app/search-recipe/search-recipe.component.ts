import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  // FourSquare Venues endpoint configuration
  FOURSQUARE_BASE_URL = 'https://api.foursquare.com/v2/venues/explore';
  FOURSQUARE_CLIENT_ID = 'H5EETN0LSQSI5BI543FMCNKXV1EYWJFI2FVW3JRGPRSVS4UK';
  FOURSQUARE_CLIENT_SECRET = 'MIXINUYYB1S2TB542ZYEA5U1HXS1VCOHNTR41DKR3CLB34CG';
  FOURSQUARE_URL = this.FOURSQUARE_BASE_URL + '?client_id=' + this.FOURSQUARE_CLIENT_ID +
    '&client_secret=' + this.FOURSQUARE_CLIENT_SECRET + '&v=20211002';

  // EDAMAM Recipes endpoint configuration
  EDAMAM_BASE_URL = 'https://api.edamam.com/search';
  EDAMAM_APP_ID = 'c5dba623';
  EDAMAM_APP_KEY = 'c8b41b8e40947abeae64ba445dc1db33';
  EDAMAM_URL = this.EDAMAM_BASE_URL + '?app_id=' + this.EDAMAM_APP_ID + '&app_key=' + this.EDAMAM_APP_KEY;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
    // To get the current location
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {
    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      // Making EDAMAM GET API call to get recipes
      this._http.get(this.EDAMAM_URL + '&q=' + this.recipeValue).
        subscribe(res => {
          const recipes = res['hits'];
          this.recipeList = recipes.map(e => e.recipe);
        }, error => {});
    }

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      // Making the FOURSQUARE GET API call to get the 10 venues based on currentLoaction and recipe as query parameter.
      this._http.get(this.FOURSQUARE_URL + '&limit=10' + '&near=' + this.placeValue + '&query=' + this.recipeValue).
      subscribe(res => {
        const venues = res['response'].groups[0].items;
        this.venueList = venues.map(e => e.venue);
      }, error => {});
    }
  }
}
