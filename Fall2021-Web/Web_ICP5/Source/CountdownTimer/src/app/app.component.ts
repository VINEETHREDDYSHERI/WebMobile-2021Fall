import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  eventName: string;
  eventDateTime: string;
  eventCountDownList: any[] = [];
  calculatedTimerData: any[] = [];

  // To add event and its countdown timer
  addEvent() {
    this.eventCountDownList.push({eventName: this.eventName, eventDateTime: this.eventDateTime});
    const eventTime = new Date(this.eventDateTime).getTime();
    this.calculatedTimerData.push(this.getCurrentTimeRemaining(eventTime));
    // Calling the Timer function
    this.setEventTimerCountdown(this.eventCountDownList.length - 1);

    // Clearing the TextField and DateField value
    this.eventName = '';
    this.eventDateTime = '';
  }

  // To calculate no.of days, hours, minutes and seconds from the current date to given event date
  getCurrentTimeRemaining(eventTime) {
    const presentTime = new Date().getTime();
    const difference = eventTime - presentTime;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }

  // To update the countdown timer value
  setEventTimerCountdown(eventIdx: number) {
    const eventTime = new Date(this.eventCountDownList[eventIdx].eventDateTime).getTime();
    // Updating the countdown timer value every 1 second
    setInterval(() => {
      this.calculatedTimerData[eventIdx] = this.getCurrentTimeRemaining(eventTime);
      console.log(this.calculatedTimerData);
    }, 1000);
  }

}
