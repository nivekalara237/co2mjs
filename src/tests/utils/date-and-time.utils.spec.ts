import {DateAndTimeUtils} from "../../lib";

describe("DateAndTimeUtils", () => {
  it("should linearized time", () => {
    expect(DateAndTimeUtils.linearisedTime("01:00:00")).toEqual("3600s");
  });

  it("should linearized malformated time", () => {
    expect(DateAndTimeUtils.linearisedTime("03:23:34:89")).toEqual("");
  });

  it("should linearized undefined time", () => {
    expect(DateAndTimeUtils.linearisedTime(undefined)).toEqual(undefined);
  });

  describe('DateUtils', () => {
    describe('formatDate', () => {
      it('should format date correctly', () => {
        const date = new Date(2023, 5, 15, 14, 30);
        expect(DateAndTimeUtils.formatDate(date, 'dd/MM/yyyy')).toBe('15/06/2023');
        expect(DateAndTimeUtils.formatDate(date, 'HH:mm')).toBe('14:30');
      });

      const testDate = new Date(2023, 5, 15, 14, 30, 45); // 15 juin 2023 14:30:45

      it('should format date with French pattern', () => {
        expect(DateAndTimeUtils.formatDate(testDate, 'dd/MM/yyyy')).toBe('15/06/2023');
      });

      it('should format time with leading zeros', () => {
        expect(DateAndTimeUtils.formatDate(testDate, 'HH:mm:ss')).toBe('14:30:45');
      });

      it('should handle single digit values', () => {
        const date = new Date(2023, 8, 5, 9, 5, 2);
        expect(DateAndTimeUtils.formatDate(date, 'd/M/yyyy H:m:s')).toBe('5/9/2023 9:5:2');
      });

      it('should return empty string for invalid date', () => {
        expect(DateAndTimeUtils.formatDate(new Date('invalid'), 'dd/MM/yyyy')).toBe('');
      });
    });
    describe('addToDate', () => {
      it('should add days correctly', () => {
        const date = new Date(2023, 0, 1);
        const result = DateAndTimeUtils.addToDate(date, { days: 5 });
        expect(result.getDate()).toBe(6);
      });
      const startDate = new Date(2023, 0, 31); // 31 janvier 2023

      it('should add months with year overflow', () => {
        const result = DateAndTimeUtils.addToDate(startDate, { months: 1 });
        expect(result.getMonth()).toBe(2); // Mars
        expect(result.getDate()).toBe(31);
      });

      it('should subtract days correctly', () => {
        const result = DateAndTimeUtils.addToDate(startDate, { days: -30 });
        expect(result.getDate()).toBe(1);
      });

      it('should handle leap years', () => {
        const leapDate = new Date(2020, 1, 28); // 28 février 2020
        const result = DateAndTimeUtils.addToDate(leapDate, { days: 1 });
        expect(result.getDate()).toBe(29);
      });

      it('should return same date for empty duration', () => {
        expect(DateAndTimeUtils.addToDate(startDate, {})).toEqual(startDate);
      });
    });
    describe('dateDiff', () => {
      it('should calculate day difference', () => {
        const date1 = new Date(2023, 0, 1);
        const date2 = new Date(2023, 0, 3);
        expect(DateAndTimeUtils.dateDiff(date1, date2)).toBe(2);
      });
    });
    describe('compareDates', () => {
      const date1 = new Date(2023, 0, 1);
      const date2 = new Date(2023, 0, 2);

      it('should return 0 for equal dates', () => {
        expect(DateAndTimeUtils.compareDates(date1, new Date(date1))).toBe(0);
      });

      it('should return -1 when first date is earlier', () => {
        expect(DateAndTimeUtils.compareDates(date1, date2)).toBe(-1);
      });

      it('should return 1 when first date is later', () => {
        expect(DateAndTimeUtils.compareDates(date2, date1)).toBe(1);
      });

      it('should ignore time component', () => {
        const withTime = new Date(date1);
        withTime.setHours(23, 59, 59);
        expect(DateAndTimeUtils.compareDates(date1, withTime)).toBe(0);
      });
    });
    describe('isOverlapping', () => {
      const period1 = [new Date(2023, 0, 1), new Date(2023, 0, 10)];

      it('should detect overlapping periods', () => {
        const period2 = [new Date(2023, 0, 5), new Date(2023, 0, 15)];
        // @ts-ignore
        expect(DateAndTimeUtils.isOverlapping(...period1, ...period2)).toBe(true);
      });

      it('should detect adjacent periods as non-overlapping', () => {
        const period2 = [new Date(2023, 0, 10), new Date(2023, 0, 20)];
        // @ts-ignore
        expect(DateAndTimeUtils.isOverlapping(...period1, ...period2)).toBe(false);
      });

      it('should handle complete containment', () => {
        const period2 = [new Date(2023, 0, 3), new Date(2023, 0, 7)];
        // @ts-ignore
        expect(DateAndTimeUtils.isOverlapping(...period1, ...period2)).toBe(true);
      });
    });
    describe('formatDuration', () => {
      it('should format milliseconds correctly', () => {
        expect(DateAndTimeUtils.formatDuration(3672000)).toBe('1h 1min 12s');
      });

      it('should handle single components', () => {
        expect(DateAndTimeUtils.formatDuration(3600000)).toBe('1h');
        expect(DateAndTimeUtils.formatDuration(60000)).toBe('1min');
        expect(DateAndTimeUtils.formatDuration(1000)).toBe('1s');
      });

      it('should return empty string for zero duration', () => {
        expect(DateAndTimeUtils.formatDuration(0)).toBe('');
      });

      it('should handle large durations', () => {
        expect(DateAndTimeUtils.formatDuration(93784000)).toBe('26h 3min 4s');
      });
    });
    describe('dateDiff', () => {
      const date1 = new Date(2023, 0, 1, 12, 0);
      const date2 = new Date(2023, 0, 3, 14, 30);

      it('should calculate day difference', () => {
        expect(DateAndTimeUtils.dateDiff(date1, date2, 'days')).toBe(2);
      });

      it('should calculate hour difference', () => {
        expect(DateAndTimeUtils.dateDiff(date1, date2, 'hours')).toBe(50);
      });

      it('should return absolute value', () => {
        expect(DateAndTimeUtils.dateDiff(date2, date1, 'days')).toBe(2);
      });

      it('should handle same date', () => {
        expect(DateAndTimeUtils.dateDiff(date1, date1, 'minutes')).toBe(0);
      });
    });
    describe('getDateRange', () => {
      it('should generate date range', () => {
        const start = new Date(2023, 0, 1);
        const end = new Date(2023, 0, 3);
        const result = DateAndTimeUtils.getDateRange(start, end);
        expect(result.length).toBe(3);
        expect(result[0]).toEqual(start);
        expect(result[2]).toEqual(end);
      });

      it('should handle single day range', () => {
        const date = new Date();
        expect(DateAndTimeUtils.getDateRange(date, date)).toEqual([date]);
      });

      it('should return empty array for invalid range', () => {
        const laterDate = new Date();
        const earlierDate = new Date(laterDate.getTime() - 1000);
        expect(DateAndTimeUtils.getDateRange(laterDate, earlierDate)).toEqual([]);
      });
    });
    describe('isBusinessDay', () => {
      it('should recognize weekdays', () => {
        const monday = new Date(2023, 0, 2); // Lundi 2 janvier
        expect(DateAndTimeUtils.isBusinessDay(monday)).toBe(true);
      });

      it('should recognize weekends', () => {
        const saturday = new Date(2023, 0, 7); // Samedi 7 janvier
        expect(DateAndTimeUtils.isBusinessDay(saturday)).toBe(false);
      });

      it('should handle edge cases', () => {
        const sunday = new Date(2023, 0, 1); // Dimanche 1er janvier
        const friday = new Date(2023, 0, 6); // Vendredi 6 janvier
        expect(DateAndTimeUtils.isBusinessDay(sunday)).toBe(false);
        expect(DateAndTimeUtils.isBusinessDay(friday)).toBe(true);
      });
    });
    describe('convertTimezone', () => {
      const utcDate = new Date('2023-01-01T00:00:00Z');

      it('should convert to New York time', () => {
        const nyDate = DateAndTimeUtils.convertTimezone(utcDate, 'America/New_York');
        expect(nyDate.getHours()).toBe(19); // 19h la veille (UTC-5)
      });

      it('should handle invalid timezone', () => {
        expect(() => DateAndTimeUtils.convertTimezone(utcDate, 'Invalid/Timezone')).toThrow();
      });

      it('should maintain same time for UTC', () => {
        const result = DateAndTimeUtils.convertTimezone(utcDate, 'UTC');
        expect(result.getTime()).toBe(utcDate.getTime());
      });
    });
  });

  describe('Time Conversion Utilities', () => {
    describe('hoursToMs', () => {
      it('should convert hours to milliseconds', () => {
        expect(DateAndTimeUtils.hoursToMs(1)).toBe(3600000);
        expect(DateAndTimeUtils.hoursToMs(0.5)).toBe(1800000);
      });
    });

    describe('timeStringToMs', () => {
      it('should convert "HH:MM:SS" to milliseconds', () => {
        expect(DateAndTimeUtils.timeStringToMs('01:30:00')).toBe(5400000);
        expect(DateAndTimeUtils.timeStringToMs('00:01:30')).toBe(90000);
      });

      it('should handle missing seconds', () => {
        expect(DateAndTimeUtils.timeStringToMs('02:30')).toBe(9000000);
      });
    });

    describe('msToTimeString', () => {
      it('should format milliseconds correctly', () => {
        expect(DateAndTimeUtils.msToTimeString(3661000)).toBe('01:01:01');
        expect(DateAndTimeUtils.msToTimeString(900000)).toBe('00:15:00');
      });

      it('should handle durations > 24h', () => {
        expect(DateAndTimeUtils.msToTimeString(90000000)).toBe('25:00:00');
      });
    });
    describe('Time Manipulation Utilities', () => {
      describe('addTime', () => {
        it('should add time correctly', () => {
          expect(DateAndTimeUtils.addTime('09:00', '02:30')).toBe('11:30');
          expect(DateAndTimeUtils.addTime('23:00', '02:00')).toBe('25:00');
        });
      });

      describe('timeDiff', () => {
        it('should calculate time difference', () => {
          expect(DateAndTimeUtils.timeDiff('14:00', '10:30')).toBe('03:30');
          expect(DateAndTimeUtils.timeDiff('08:00', '09:45')).toBe('01:45');
        });
      });

      describe('isTimeBetween', () => {
        it('should check time inclusion', () => {
          expect(DateAndTimeUtils.isTimeBetween('12:30', '09:00', '17:00')).toBe(true);
          expect(DateAndTimeUtils.isTimeBetween('08:00', '09:00', '17:00')).toBe(false);
        });

        it('should handle overnight ranges', () => {
          expect(DateAndTimeUtils.isTimeBetween('23:00', '22:00', '02:00')).toBe(true);
        });
      });
    });
    describe('Advanced Time Utilities', () => {
      describe('roundToNearestQuarter', () => {
        it('should round time correctly', () => {
          expect(DateAndTimeUtils.roundToNearestQuarter('08:07')).toBe('08:00');
          expect(DateAndTimeUtils.roundToNearestQuarter('10:22')).toBe('10:15');
          expect(DateAndTimeUtils.roundToNearestQuarter('15:38')).toBe('15:45');
        });

        it('should handle hour overflow', () => {
          expect(DateAndTimeUtils.roundToNearestQuarter('23:50')).toBe('00:00');
        });
      });

      describe('timeSince', () => {
        const now = new Date();

        it('should show correct time elapsed', () => {
          const fiveMinsAgo = new Date(now.getTime() - 300000);
          expect(DateAndTimeUtils.timeSince(fiveMinsAgo, now)).toBe('il y a 5 minutes');

          const twoHoursAgo = new Date(now.getTime() - 7200000);
          expect(DateAndTimeUtils.timeSince(twoHoursAgo, now)).toBe('il y a 2 heures');
        });

        it('should handle just now case', () => {
          expect(DateAndTimeUtils.timeSince(now, now)).toBe('à l\'instant');
        });
      });
    });
    describe('Time Validation', () => {
      it('should validate time strings', () => {
        expect(DateAndTimeUtils.isValidTime('12:34')).toBe(true);
        expect(DateAndTimeUtils.isValidTime('25:00')).toBe(false);
        expect(DateAndTimeUtils.isValidTime('abc')).toBe(false);
      });

      it('should validate time ranges', () => {
        expect(DateAndTimeUtils.isValidTimeRange('09:00', '17:00')).toBe(true);
        expect(DateAndTimeUtils.isValidTimeRange('18:00', '09:00')).toBe(true); // Overnight
        expect(DateAndTimeUtils.isValidTimeRange('invalid', '17:00')).toBe(false);
      });
    });
  });
});
