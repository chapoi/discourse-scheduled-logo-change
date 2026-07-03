import { apiInitializer } from "discourse/lib/api";
import { activeSchedule, dayOrdinal, logoFor } from "../lib/schedule";

export default apiInitializer((api) => {
  const session = api.container.lookup("service:session");

  api.registerValueTransformer("home-logo-image-url", ({ value, context }) => {
    const schedule = activeSchedule(settings.schedules, dayOrdinal(new Date()));
    if (!schedule) {
      return value;
    }

    const dark = context.dark || session.defaultColorSchemeIsDark;
    return logoFor(schedule, context.name, dark) || value;
  });
});
