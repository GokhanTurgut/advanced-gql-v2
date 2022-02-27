const gql = require("graphql-tag");

const createTestServer = require("./helper");

const CREATE_POST = gql`
  mutation {
    createPost(input: { message: "First post!" }) {
      message
    }
  }
`;

describe("mutations", () => {
  test("creates a post", async () => {
    const { mutate } = createTestServer({
      user: { id: 1 },
      models: {
        Post: {
          createOne: jest.fn(() => {
            return { id: 1, message: "First post!" };
          }),
        },
      },
    });

    const res = await mutate({ query: CREATE_POST });
    expect(res).toMatchSnapshot();
  });
});
