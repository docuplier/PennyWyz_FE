import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import UTCFormat from "dayjs/plugin/utc";
import TimeZone from "dayjs/plugin/timezone";
import MinMax from "dayjs/plugin/minMax";
import Duration from "dayjs/plugin/duration";
import RelativeTime from "dayjs/plugin/relativeTime";
import IsBetween from "dayjs/plugin/isBetween";

dayjs.extend(updateLocale);

dayjs.extend(UTCFormat);
dayjs.extend(TimeZone);
dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.extend(MinMax);
dayjs.extend(Duration);
dayjs.extend(RelativeTime);
dayjs.extend(IsBetween);

dayjs.updateLocale("en", {
  weekdays: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
});

// dayjs.tz.setDefault('Africa/Lagos');

export default dayjs;
