import * as moment from 'moment';
import { error } from 'protractor';
export class DateUtils {

  // https://hclleapwiki.atlassian.net/wiki/spaces/HL/pages/33025/JavaScript+Functions+for+Date+Fields
  static getAgeAtTimeInstance(dob: Date, timeInstance: Date): number {
    if (typeof dob === 'string') {
      dob = new Date(dob);
    }
    return (Math.abs(timeInstance.getTime() - dob.getTime()) / (1000 * 3600 * 24)) / 365.25;
  }

  static getDurationInDays(startDate: Date, endDate: Date, endDateIncluded: boolean = false): number {
    if (endDateIncluded) {
      return this.calculateDurationInDays(startDate, endDate) + 1;
    } else {
      return this.calculateDurationInDays(startDate, endDate);
    }
  }

  static calculateEndDate(startDate: Date, duration: number): Date {
    return moment(startDate).add(duration - 1, 'days').toDate();
  }

  static toMoment(date: Date): moment.Moment {
    return moment(date);
  }

  static toEETString(date: Date): string {
    return moment(date).tz('Europe/Athens').format('YYYY-MM-DD');
  }

  static toString(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  static toEETDateMonthString(date: Date): string {
    return moment(date).tz('Europe/Athens').format('YYYY-MM');
  }

  private static calculateDurationInDays(startDate: Date, endDate: Date): number {
    const diff = Math.abs(startDate.getTime() - endDate.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
}
