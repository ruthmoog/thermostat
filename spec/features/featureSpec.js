"use strict";

describe("Thermostat", function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it("starts at 20 degrees", function() {
    expect(thermostat.getCurrentTemp()).toEqual(20);
  });

  describe("up", function() {
    it("the temp is increased by 1 degree", function() {
      thermostat.up();
      expect(thermostat.getCurrentTemp()).toEqual(21);
    });
  });

  describe("down", function() {
    it("the temp is descreased by 1 degree", function() {
      thermostat.down();
      expect(thermostat.getCurrentTemp()).toEqual(19);
    });
  });

  it("has a minimum temperature of 10 degrees C", function() {
    for (var i = 0; i < 11; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemp()).toEqual(10);
  });

  describe("Power saving mode", function() {
    it("returns the status of the mode", function() {
      expect(thermostat._powerSavingMode).toEqual(true);
    });

    it("when on, has a maximum temperature of 25 degrees C", function() {
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemp()).toEqual(25);
    });

    it("can be switched off", function() {
      thermostat.powerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toEqual(false);
    });

    it("when off, has a maximum temperature of 32 degrees C", function() {
      thermostat.powerSavingModeOff();
      for (var i = 0; i < 13; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemp()).toEqual(32);
    });
  });

  describe("reset", function() {
    it("resets the temperature to 20 degrees C", function() {
      thermostat.up();
      thermostat.reset();
      expect(thermostat.getCurrentTemp()).toEqual(20);
    });
  });

  describe("energy usage", function() {
    it("returns low usage when temp is below 18", function() {
      for (var i = 0; i < 3; i++) {
        thermostat.down();
      }
      expect(thermostat.energyUsage()).toEqual("low-usage");
    });

    it("returns medium when temp is between 18 and 24 inclusive", function() {
      for (var i = 0; i < 4; i++) {
        thermostat.up();
      }
      expect(thermostat.energyUsage()).toEqual("medium-usage");
    });

    it("returns high when temp is 25 or above", function() {
      for (var i = 0; i < 7; i++) {
        thermostat.up();
      }
      expect(thermostat.energyUsage()).toEqual("high-usage");
    });
  });
});
