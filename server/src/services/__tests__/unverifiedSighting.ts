import {organisms, unverified_sightings, users} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { UnverifiedSighting } from "../../interfaces/unverifiedSighting";
import { prismaAsAny } from "../../testutil/prisma";
import { UnverifiedSightingService } from "../unverifiedSighting";

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("UnverifiedSightingService", () => {
  describe("getAllUnverifiedSightings", () => {
    it("should return full list of unverified sightings", async () => {
      prismaAsAny.unverified_sightings = {
        findMany: jest.fn().mockReturnValue([unverifiedSightingsModel]),
      };
      prismaAsAny.organisms = {
        findUnique: jest.fn().mockReturnValue(organismModel),
      };
      prismaAsAny.users = {
        findUnique: jest.fn().mockReturnValue(userModel),
      };
      const result = await UnverifiedSightingService.getAllUnverifiedSightings();
      expect(result[0].userId).toEqual(unverifiedSightingsModel.user_id);
    });
  });

  describe("getSightingsByOrganismId", () => {
    it("should return all sightings of an organism by id", async () => {
      prismaAsAny.unverified_sightings = {
        findMany: jest.fn().mockReturnValueOnce([unverifiedSightingsModel]),
      };
      const result = await UnverifiedSightingService.getSightingsByOrganismId(1);
      expect(result[0].lat).toEqual(unverifiedSightingsModel.lat);
    });
  });

  describe("getSightingsByUserId", () => {
    it("should return all sightings of by a user by id", async () => {
      prismaAsAny.unverified_sightings = {
        findMany: jest.fn().mockReturnValueOnce([unverifiedSightingsModel]),
      };
      const result = await UnverifiedSightingService.getSightingsByUserId(1);
      expect(result[0].userId).toEqual(unverifiedSightingsModel.user_id);
    });
  });

  describe("createUnverifiedSighting", () => {
    it("should create a new unverified sighting", async () => {
      const prismaObjectSighting = unverifiedSightingsModel;

      const interfaceObjectSighting: UnverifiedSighting = {
        organismId: 1,
        userId: 1,
        pictureUrl: "a picture.jpg",
        date: new Date("2000-10-01"),
        lat: 54.0101,
        long: -7.2222,
        userVotes: 0,
        sightingId: 0,
        organismName: "Bird",
        userName: "test",
      };

      prismaAsAny.unverified_sightings = {
        create: jest.fn().mockResolvedValueOnce(prismaObjectSighting),
      };

      const final = await UnverifiedSightingService.createUnverifiedSighting(interfaceObjectSighting);

      expect(final.organism_id).toEqual(interfaceObjectSighting.organismId);
    });
  });

  describe("updateUnverifiedSighting", () => {
    it("should update an unverified sighting", async () => {
      const prismaObjectSighting = {
        id: 15,
        organism_id: 1,
        user_id: 0,
        picture_url: "test.jpg",
        date: "2000-01-01",
        lat: 54.0002,
        long: -7.0101,
        user_votes: 1,
      };

      console.log(prismaObjectSighting);

      const interfaceObjectSighting: UnverifiedSighting = {
        sightingId: 15,
        organismId: 2,
        userId: 0,
        pictureUrl: "test.jpg",
        date: new Date("2000-01-01"),
        lat: 54.0002,
        long: -7.0101,
        userVotes: 1,
        organismName: "Bird",
        userName: "test",
      };

      console.log(interfaceObjectSighting);

      prismaAsAny.unverified_sightings = {
        update: jest.fn().mockResolvedValueOnce(prismaObjectSighting),
      };

      const final = await UnverifiedSightingService.updateSighting(interfaceObjectSighting);
      console.log(final);
      expect(final.organism_id).toEqual(prismaObjectSighting.organism_id);
    });
  });

  describe("deleteSightingById", () => {
    it("should delete a sighting using the id", async () => {
      prismaAsAny.unverified_sightings = {
        delete: jest.fn().mockReturnValueOnce("Success"),
      };

      const mock = await UnverifiedSightingService.deleteUnverifiedSightingById(5);

      expect(mock).toEqual("Success");
    });
  });
});

const unverifiedSightingsModel: unverified_sightings = {
  id: 5,
  organism_id: 1,
  user_id: 1,
  picture_url: "a picture.jpg",
  date: new Date("2000-10-01"),
  lat: new Decimal(54.0101),
  long: new Decimal(-7.2222),
  user_votes: 1
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
