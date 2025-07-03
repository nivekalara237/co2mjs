import { ObjectUtils } from "./object.utils";

export class DateAndTimeUtils {
  //HH:mm:ss ==> PD<x>s
  // 01:00:20 ==> 3620s
  public static linearisedTime = (duree: string, surfix: string = "s") => {
    if (ObjectUtils.isNullOrUndefined(duree)) {
      return duree;
    }
    const regex = new RegExp(
      "^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$",
      "g",
    );
    if (!regex.test(duree)) {
      return "";
    }
    const timeArr = duree.split(":");
    const h = +timeArr[0] * (60 * 60);
    const m = +timeArr[1] * 60;
    const s = +timeArr[2];
    return h + m + s + surfix;
  };

  /**
   * Formate une date selon un pattern spécifique
   * @example
   * formatDate(new Date(), 'dd/MM/yyyy') => "15/06/2023"
   * formatDate(new Date(), 'HH:mm:ss') => "14:30:15"
   */
  public static formatDate(date: Date, pattern: string): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return pattern
        .replace(/yyyy/g, date.getFullYear().toString())
        .replace(/MM/g, pad(date.getMonth() + 1))
        .replace(/dd/g, pad(date.getDate()))
        .replace(/HH/g, pad(date.getHours()))
        .replace(/mm/g, pad(date.getMinutes()))
        .replace(/ss/g, pad(date.getSeconds()));
  }

  /**
   * Ajoute/soustrait une durée à une date
   * @example
   * addToDate(new Date(), { days: 5 }) // Ajoute 5 jours
   * addToDate(new Date(), { months: -1 }) // Soustrait 1 mois
   */
  public static addToDate(
      date: Date,
      duration: { years?: number; months?: number; days?: number; hours?: number; minutes?: number }
  ): Date {
    const result = new Date(date);
    if (duration.years) result.setFullYear(result.getFullYear() + duration.years);
    if (duration.months) result.setMonth(result.getMonth() + duration.months);
    if (duration.days) result.setDate(result.getDate() + duration.days);
    if (duration.hours) result.setHours(result.getHours() + duration.hours);
    if (duration.minutes) result.setMinutes(result.getMinutes() + duration.minutes);
    return result;
  }

  /**
   * Compare deux dates en ignorant l'heure
   * @returns 0 si égales, 1 si date1 > date2, -1 si date1 < date2
   */
  public static compareDates(date1: Date, date2: Date): number {
    const d1 = new Date(date1).setHours(0, 0, 0, 0);
    const d2 = new Date(date2).setHours(0, 0, 0, 0);
    return Math.sign(d1 - d2);
  }

  /**
   * Vérifie si deux périodes se chevauchent
   */
  public static isOverlapping(
      start1: Date, end1: Date,
      start2: Date, end2: Date
  ): boolean {
    return start1 < end2 && end1 > start2;
  }

  /**
   * Convertit une durée en millisecondes vers un format lisible
   * @example
   * formatDuration(3672000) => "1h 1min 12s"
   */
  public static formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return [
      hours && `${hours}h`,
      minutes && `${minutes}min`,
      seconds && `${seconds}s`
    ].filter(Boolean).join(' ');
  }

  /**
   * Calcule la différence entre deux dates
   */
  public static dateDiff(
      date1: Date,
      date2: Date,
      unit: 'days' | 'hours' | 'minutes' | 'seconds' = 'days'
  ): number {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    switch (unit) {
      case 'seconds': return Math.floor(diff / 1000);
      case 'minutes': return Math.floor(diff / (1000 * 60));
      case 'hours': return Math.floor(diff / (1000 * 60 * 60));
      case 'days': return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
  }

  /**
   * Génère un tableau de dates entre deux dates
   * @example
   * getDateRange (startDate, endDate) → [Date, Date…,]
   */
  public static getDateRange(start: Date, end: Date): Date[] {
    const dates: Date[] = [];
    let current = new Date(start);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  /**
   * Vérifie si une date est un jour ouvré (lundi-vendredi)
   */
  public static isBusinessDay(date: Date): boolean {
    return date.getDay() >= 1 && date.getDay() <= 5;
  }

  /**
   * Convertit une timezone (ex: 'Europe/Paris')
   */
  public static convertTimezone(date: Date, targetZone: string): Date {
    return new Date(date.toLocaleString('en-US', { timeZone: targetZone }));
  }

  /**
   * Convertit les heures en millisecondes
   * @example hoursToMs(2) => 7200000
   */
  public static hoursToMs(hours: number): number {
    return hours * 60 * 60 * 1000;
  }

  /**
   * Convertit une durée "HH:MM:SS" en millisecondes
   * @example timeStringToMs('01:30:00') => 5400000
   */
  public static timeStringToMs(timeStr: string): number {
    const [h, m, s] = timeStr.split(':').map(Number);
    return this.hoursToMs(h) + (m * 60000) + (s * 1000);
  }

  /**
   * Formate des millisecondes en "HH:MM:SS"
   * @example msToTimeString(3661000) => "01:01:01"
   */
  public static msToTimeString(ms: number): string {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    return [hours, minutes, seconds]
        .map(v => v.toString().padStart(2, '0'))
        .join(':');
  }

  /**
   * Ajoute un temps spécifié à une heure existante
   * @example addTime('09:00', '02:30') => '11:30'
   */
  public static addTime(startTime: string, duration: string): string {
    const startMs = this.timeStringToMs(startTime);
    const durationMs = this.timeStringToMs(duration);
    return this.msToTimeString(startMs + durationMs);
  }

  /**
   * Calcule la différence entre deux heures
   * @example timeDiff('14:00', '10:30') => '03:30'
   */
  public static timeDiff(time1: string, time2: string): string {
    const ms1 = this.timeStringToMs(time1);
    const ms2 = this.timeStringToMs(time2);
    return this.msToTimeString(Math.abs(ms1 - ms2));
  }

  /**
   * Vérifie si une heure est dans une plage horaire
   * @example isTimeBetween('12:30', '09:00', '17:00') => true
   */
  public static isTimeBetween(
      time: string,
      start: string,
      end: string,
      inclusive = true
  ): boolean {
    const [t, s, e] = [time, start, end].map(this.timeStringToMs);

    return inclusive
        ? t >= s && t <= e
        : t > s && t < e;
  }

  /**
   * Arrondit une heure au quart d'heure le plus proche
   * @example roundToNearestQuarter('08:07') => '08:00'
   */
  public static roundToNearestQuarter(timeStr: string): string {
    const [h, m] = timeStr.split(':').map(Number);
    const roundedMins = Math.round(m / 15) * 15;
    const carryOver = Math.floor(roundedMins / 60);

    const hours = (h + carryOver) % 24;
    const mins = roundedMins % 60;

    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  /**
   * Calcule le temps écoulé depuis une date/heure
   * @example timeSince(new Date()) => 'à l'instant'
   */
  public static timeSince(date: Date, now = new Date()): string {
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
      'année': 31536000,
      mois: 2592000,
      semaine: 604800,
      jour: 86400,
      heure: 3600,
      minute: 60,
      seconde: 1
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `il y a ${interval} ${unit}${interval > 1 ? 's' : ''}`;
      }
    }

    return 'à l\'instant';
  }
}
