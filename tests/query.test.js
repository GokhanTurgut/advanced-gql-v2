const gql = require("graphql-tag");

const createTestServer = require("./helper");

const FEED = gql`
  {
    feed {
      id
      message
      createdAt
      likes
      views
    }
  }
`;

const ME = gql`
  {
    me {
      id
      email
      verified
      role
      avatar
      createdAt
    }
  }
`;

describe("queries", () => {
  test("feed", async () => {
    const { query } = createTestServer({
      user: { id: 1 },
      models: {
        Post: {
          findMany: jest.fn(() => [
            {
              id: 1,
              message: "hello",
              createdAt: 12345839,
              likes: 20,
              views: 300,
            },
          ]),
        },
      },
    });

    const res = await query({ query: FEED });
    expect(res).toMatchSnapshot();
  });

  test("me", async () => {
    const { query } = createTestServer({
      user: {
        email: "test@test.com",
        password: "test",
        role: "ADMIN",
        verified: false,
        avatar: "http",
        createdAt: 1645708035209,
        id: "qi6haU8K48AjaqVvdoe7J",
      },
    });

    const res = await query({ query: ME });
    expect(res).toMatchSnapshot();
  });
});
