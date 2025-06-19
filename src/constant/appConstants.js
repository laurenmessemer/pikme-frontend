export const ROLE_ADMIN = "ADMIN";
export const ROUTE_ADMIN = "admin";

export const ROLE_USER = "USER";

export const ADMIN_SERVICE_KEY = "ADMIN";
export const DEFAULT_SERVICE_KEY = "USER";

export const RESPONSE_OK = 200;
export const RESPONSE_CREATED = 201;

export const API_METHOD_GET = "GET";
export const API_METHOD_POST = "POST";
export const API_METHOD_DELETE = "DELETE";
export const API_METHOD_PUT = "PUT";

// this MAP for make diffrent service separated url
export const BASE_URLS = new Map();
BASE_URLS.set(DEFAULT_SERVICE_KEY, `${import.meta.env.VITE_API_URL}`);
BASE_URLS.set(ADMIN_SERVICE_KEY, `${import.meta.env.VITE_API_URL}`);

export const ImageUrl = `${import.meta.env.VITE_IMAGE_URL}`;
export const SiteUrl = `${import.meta.env.VITE_SITE_URL}`;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const countSkipValue = (page, pageSize) => (page - 1) * pageSize

// Report status classes for styling
export const REPORT_STATUS_CLASSES = {
  Violation: "ban",
  "No Violation": "warn",
  New: "normal",
  "User Action Pending": "user-pending",
  "Admin Review Pending": "admin-pending",
  Complete: "complete",
};

// Report filter options
export const REPORT_FILTER_OPTIONS = [
  "All",
  "Violation",
  "No Violation",
  "New",
  "User Action Pending",
  "Admin Review Pending",
  "Complete",
];

export const allDummyWinners = [
  {
    contest_id: 21,
    theme_id: 10,
    name: "A Splash of Color",
    description:
      "Celebrate the vibrancy of life with splashes of color on every street and canvas. This contest captures the bold and the beautiful in urban landscapes and natural settings alike.",
    startDate: "2025-04-15T00:00:00.000Z",
    endDate: "2025-04-20T00:00:00.000Z",
    special_rules: "",
    cover_image_url:
      "https://images.unsplash.com/photo-1510265236892-329bfd7de7a1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWV0fGVufDB8fDB8fHww",
    totalParticipants: "5",
    status: "Complete",
    createdAt: "2025-05-30T09:40:10.136Z",
    winners: [
      {
        username: "Billy123",
        image:
          "https://plus.unsplash.com/premium_photo-1672097247804-add051dcd682?w=900&auto=format&fit=crop&q=60",
        totalVotes: 8,
        payout: 100,
        position: 1,
      },
      {
        username: "YogiBear",
        image:
          "https://images.unsplash.com/photo-1572465840067-215e99e08145?w=900&auto=format&fit=crop&q=60",
        totalVotes: 7,
        payout: 60,
        position: 2,
      },
      {
        username: "Fred",
        image:
          "https://plus.unsplash.com/premium_photo-1668061706855-26d4cf0f6248?w=900&auto=format&fit=crop&q=60",
        totalVotes: 7,
        payout: 40,
        position: 3,
      },
    ],
  },
  {
    contest_id: 22,
    theme_id: 11,
    name: "Daily Commute",
    description:
      "From bustling city subways to quiet country lanes, this contest highlights the stories behind everyday journeys. Show us the moments and memories that define your daily commute.",
    startDate: "2025-04-21T00:00:00.000Z",
    endDate: "2025-04-26T00:00:00.000Z",
    special_rules: "",
    cover_image_url:
      "https://images.unsplash.com/photo-1572465840067-215e99e08145?w=900&auto=format&fit=crop&q=60",
    totalParticipants: "8",
    status: "Complete",
    createdAt: "2025-05-30T09:40:10.136Z",
    winners: [
      {
        username: "Daphne",
        image:
          "https://plus.unsplash.com/premium_photo-1668061706855-26d4cf0f6248?w=900&auto=format&fit=crop&q=60",
        totalVotes: 9,
        payout: 120,
        position: 1,
      },
      {
        username: "johnpics",
        image:
          "https://plus.unsplash.com/premium_photo-1672097247804-add051dcd682?w=900&auto=format&fit=crop&q=60",
        totalVotes: 8,
        payout: 75,
        position: 2,
      },
      {
        username: "andywhophotos",
        image:
          "https://plus.unsplash.com/premium_photo-1715030289409-5e81652149e7?w=900&auto=format&fit=crop&q=60",
        totalVotes: 7,
        payout: 50,
        position: 3,
      },
    ],
  },
  {
    contest_id: 23,
    theme_id: 12,
    name: "Golden Hour",
    description:
      "Capture the magical moments when the sun paints the world in gold and soft hues. This contest is all about the light and beauty of sunrise and sunset.",
    startDate: "2025-04-27T00:00:00.000Z",
    endDate: "2025-05-02T00:00:00.000Z",
    special_rules: "",
    cover_image_url:
      "https://images.unsplash.com/photo-1516727052521-08079c40df80?w=900&auto=format&fit=crop&q=60",
    totalParticipants: "10",
    status: "Complete",
    createdAt: "2025-05-30T09:40:10.136Z",
    winners: [
      {
        username: "chickennugzz",
        image:
          "https://images.unsplash.com/photo-1562023781-c71cfbda3d5d?w=900&auto=format&fit=crop&q=60",
        totalVotes: 10,
        payout: 150,
        position: 1,
      },
      {
        username: "isaac.laifer",
        image:
          "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?w=900&auto=format&fit=crop&q=60",
        totalVotes: 9,
        payout: 90,
        position: 2,
      },
      {
        username: "photo_pete",
        image:
          "https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=900&auto=format&fit=crop&q=60",
        totalVotes: 8,
        payout: 60,
        position: 3,
      },
    ],
  },
  {
    contest_id: 24,
    theme_id: 13,
    name: "Food Flex",
    description:
      "A visual feast awaits! This contest is all about the artistry of food, from street eats to gourmet platings. Show us the dishes that make your mouth water and your camera click.",
    startDate: "2025-05-03T00:00:00.000Z",
    endDate: "2025-05-08T00:00:00.000Z",
    special_rules: "",
    cover_image_url:
      "https://images.unsplash.com/photo-1505870136463-c17bc84b30a2?w=900&auto=format&fit=crop&q=60",
    totalParticipants: "12",
    status: "Complete",
    createdAt: "2025-05-30T09:40:10.136Z",
    winners: [
      {
        username: "forestshots",
        image:
          "https://images.unsplash.com/photo-1552912470-ee2e96439539?w=900&auto=format&fit=crop&q=60",
        totalVotes: 12,
        payout: 160,
        position: 1,
      },
      {
        username: "joshhhss",
        image:
          "https://images.unsplash.com/photo-1606392340576-c31a40313caa?w=900&auto=format&fit=crop&q=60",
        totalVotes: 11,
        payout: 100,
        position: 2,
      },
      {
        username: "jemma.bp",
        image:
          "https://plus.unsplash.com/premium_photo-1673580742890-4af144293960?w=900&auto=format&fit=crop&q=60",
        totalVotes: 10,
        payout: 70,
        position: 3,
      },
    ],
  },
  {
    contest_id: 25,
    theme_id: 14,
    name: "In the Wild",
    description:
      "Explore nature’s raw beauty in its purest form. From vast savannahs to dense forests, this contest brings the wild to life. Show us your best wildlife and nature captures.",
    startDate: "2025-05-09T00:00:00.000Z",
    endDate: "2025-05-15T00:00:00.000Z",
    special_rules: "",
    cover_image_url:
      "https://images.unsplash.com/photo-1612738331950-40abbddce9aa?w=900&auto=format&fit=crop&q=60",
    totalParticipants: "15",
    status: "Complete",
    createdAt: "2025-05-30T09:40:10.136Z",
    winners: [
      {
        username: "pruthvidarji1993",
        image:
          "https://plus.unsplash.com/premium_photo-1664302781209-5af39fb6510e?w=900&auto=format&fit=crop&q=60",
        totalVotes: 15,
        payout: 200,
        position: 1,
      },
      {
        username: "Divyesh Patel",
        image:
          "https://images.unsplash.com/photo-1742171046308-a62bcecded9d?w=900&auto=format&fit=crop&q=60",
        totalVotes: 13,
        payout: 120,
        position: 2,
      },
      {
        username: "dhrumil",
        image:
          "https://plus.unsplash.com/premium_photo-1661936361131-c421746dcd0d?w=900&auto=format&fit=crop&q=60",
        totalVotes: 12,
        payout: 80,
        position: 3,
      },
    ],
  },
];
