import { module, test } from "qunit";
import {
  activeSchedule,
  dayOrdinal,
  isActive,
  logoFor,
  monthNumber,
} from "../../../discourse/lib/schedule";

function schedule(attrs = {}) {
  return {
    name: "Test",
    start_month: "June",
    start_day: 1,
    end_month: "June",
    end_day: 30,
    logo: "/uploads/june-light.png",
    ...attrs,
  };
}

module("Scheduled Logo | Unit | schedule", function () {
  test("monthNumber maps month names to 1-based numbers", function (assert) {
    assert.strictEqual(monthNumber("January"), 1);
    assert.strictEqual(monthNumber("December"), 12);
    assert.strictEqual(monthNumber("Nonsense"), null);
  });

  test("isActive returns false when a month name is invalid", function (assert) {
    assert.false(isActive(schedule({ start_month: "Smarch" }), 615));
  });

  test("dayOrdinal encodes month and day", function (assert) {
    assert.strictEqual(dayOrdinal(new Date(2026, 0, 1)), 101);
    assert.strictEqual(dayOrdinal(new Date(2026, 11, 31)), 1231);
  });

  test("isActive matches dates within a normal range, inclusive", function (assert) {
    const june = schedule();

    assert.true(isActive(june, 601), "start boundary");
    assert.true(isActive(june, 615), "middle");
    assert.true(isActive(june, 630), "end boundary");
    assert.false(isActive(june, 531), "before start");
    assert.false(isActive(june, 701), "after end");
  });

  test("isActive handles ranges that wrap around the year", function (assert) {
    const winter = schedule({
      start_month: "December",
      start_day: 15,
      end_month: "January",
      end_day: 5,
    });

    assert.true(isActive(winter, 1215), "start boundary in December");
    assert.true(isActive(winter, 1231), "late December");
    assert.true(isActive(winter, 101), "early January");
    assert.true(isActive(winter, 105), "end boundary in January");
    assert.false(isActive(winter, 1214), "day before start");
    assert.false(isActive(winter, 106), "day after end");
    assert.false(isActive(winter, 700), "mid-year");
  });

  test("activeSchedule returns null for empty or missing input", function (assert) {
    assert.strictEqual(activeSchedule([], 615), null);
    assert.strictEqual(activeSchedule(undefined, 615), null);
  });

  test("activeSchedule returns the first matching schedule", function (assert) {
    const first = schedule({ name: "First" });
    const second = schedule({ name: "Second" });

    assert.strictEqual(activeSchedule([first, second], 615).name, "First");
    assert.strictEqual(activeSchedule([first, second], 100), null);
  });

  test("logoFor resolves the requested variant", function (assert) {
    const s = schedule({
      logo: "/l.png",
      logo_dark: "/l-dark.png",
      mobile_logo: "/m.png",
    });

    assert.strictEqual(logoFor(s, "logo", false), "/l.png");
    assert.strictEqual(logoFor(s, "logo", true), "/l-dark.png");
    assert.strictEqual(logoFor(s, "mobile_logo", false), "/m.png");
    assert.strictEqual(logoFor(s, "logo_small", false), undefined);
    assert.strictEqual(logoFor(s, "unknown", false), null);
  });

  test("logoFor falls back to the light variant when no dark image is set", function (assert) {
    const s = schedule({ logo: "/l.png", logo_dark: null });

    assert.strictEqual(logoFor(s, "logo", true), "/l.png");
  });
});
