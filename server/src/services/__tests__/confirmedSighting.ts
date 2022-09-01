import { Decimal } from "@prisma/client/runtime";
import { ConfirmedSighting } from "../../interfaces/confirmedSighting";
import { prismaAsAny } from "../../testutil/prisma";
import {confirmed_sightings, organisms, users} from "@prisma/client";
import { ConfirmedSightingService } from "../confirmedSighting";

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("ConfirmedSightingService", () => {
  describe("getAllConfirmedSightings", () => {
    it("should return full list of confirmed sightings", async () => {
      prismaAsAny.confirmed_sightings = {
        findMany: jest.fn().mockReturnValue([confirmedSightingsModel]),
      };
      prismaAsAny.organisms = {
        findUnique: jest.fn().mockReturnValue(organismModel),
      };
      prismaAsAny.users = {
        findUnique: jest.fn().mockReturnValue(userModel),
      };
      const result = await ConfirmedSightingService.getAllConfirmedSightings();
      expect(result[0].userId).toEqual(confirmedSightingsModel.user_id);
    });
  });

  describe("getConfirmedSightingById", () => {
    it("should return a confirmed sighting by id", async () => {
      prismaAsAny.confirmed_sightings = {
        findUnique: jest.fn().mockReturnValueOnce(confirmedSightingsModel),
      };
      prismaAsAny.organisms = {
        findUnique: jest.fn().mockReturnValue(organismModel),
      };
      prismaAsAny.users = {
        findUnique: jest.fn().mockReturnValue(userModel),
      };

      const result = await ConfirmedSightingService.getConfirmedSightingById(1);
      expect(result.organismId).toEqual(confirmedSightingsModel.organism_id);
    });
  });

  describe("getSightingsByOrganismId", () => {
    it("should return all sightings of an organism by id", async () => {
      prismaAsAny.confirmed_sightings = {
        findMany: jest.fn().mockReturnValueOnce([confirmedSightingsModel]),
      };
      const result = await ConfirmedSightingService.getSightingsByOrganismId(1);
      expect(result[0].lat).toEqual(confirmedSightingsModel.lat);
    });
  });

  describe("getSightingsByUserId", () => {
    it("should return all sightings of by a user by id", async () => {
      prismaAsAny.confirmed_sightings = {
        findMany: jest.fn().mockReturnValueOnce([confirmedSightingsModel]),
      };
      const result = await ConfirmedSightingService.getSightingsByUserId(1);
      expect(result[0].userId).toEqual(confirmedSightingsModel.user_id);
    });
  });

  describe("createConfirmedSighting", () => {
    it("should create a new sighting", async () => {
      const prismaObjectSighting = {
        organism_id: 1,
        user_id: 1,
        picture_url: "test",
        date: "2000-01-01",
        lat: 54.0101,
        long: -7.0101,
      };

      const interfaceObjectSighting: ConfirmedSighting = {
        organismName: "Organism Name",
        userName: "User Name",
        sightingId: 6,
        organismId: 1,
        userId: 1,
        pictureUrl: "2000-01-01",
        date: "2000-01-01",
        lat: 54.0101,
        long: -7.0101
      };

      prismaAsAny.confirmed_sightings = {
        create: jest.fn().mockResolvedValueOnce(prismaObjectSighting),
      };

      const final = await ConfirmedSightingService.createConfirmedSighting(interfaceObjectSighting);

      expect(final.user_id).toEqual(prismaObjectSighting.user_id);
    });
  });

  describe("deleteSightingById", () => {
    it("should delete a sighting using the id", async () => {
      prismaAsAny.confirmed_sightings = {
        delete: jest.fn().mockReturnValueOnce("Success"),
      };

      const mock = await ConfirmedSightingService.deleteConfirmedSightingById(5);

      expect(mock).toEqual("Success");
    });
  });
});

const confirmedSightingsModel: confirmed_sightings = {
  id: 5,
  organism_id: 1,
  user_id: 1,
  picture_url: "picture.jpg",
  date: new Date("2000-10-01"),
  lat: new Decimal(54.1212),
  long: new Decimal(-7.3434),
};

const organismModel: organisms = {
  id: 10,
  taxon_name: "an animal",
  latin_name: "animalia",
  taxon_group_id: 1,
  picture_url: "animal.jpg",
  description: "about this animal",
  is_protected: true,
};

const userModel: users = {
  id: 10,
  user_name: "user1",
  email_address: "user1@gmail.com",
  user_password: "********",
  trusted_user: false,
  user_level_id: 2,
  user_profile_id: 10,
};
