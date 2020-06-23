const { gql } = require('apollo-server-koa')
const GraphQLJSON = require('graphql-type-json')
const ConstraintDirective = require('apollo-koa-constraint-directive')

const schemaDirectives = {
  constraint: ConstraintDirective
}

/*
 * Construct a schema, using GraphQL schema language
 */
const typeDefs = gql`
  scalar JSON
  scalar ValidateString
  scalar ValidateNumber

  directive @constraint(
    minLength: Int
    maxLength: Int
    startsWith: String
    endsWith: String
    notContains: String
    pattern: String
    format: String
    passwordScore: Int
    min: Int
    max: Int
    exclusiveMin: Int
    exclusiveMax: Int
    multipleOf: Int
  ) on INPUT_FIELD_DEFINITION

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }

  type Query {
    # This null attribute make is possible to expand query from other definitions. 
    # It's a no-op
    _null: String @deprecated
  }

  type Mutation {
    # This null attribute make is possible to expand query from other definitions. 
    # It's a no-op
    _null: String @deprecated
  }

  type Subscription {
    # This null attribute make is possible to expand query from other definitions. 
    # It's a no-op
    _null: String @deprecated
  }
`

/*
 * Provide resolver functions for your schema fields
 */
const resolvers = {
  JSON: GraphQLJSON,
  Subscription: {
    _null: {
      subscribe: () => 'deprecated'
    }
  },
  Query: {
    _null: () => 'deprecated'
  },
  Mutation: {
    _null: () => 'deprecated'
  }
}

module.exports = { typeDefs, resolvers, schemaDirectives }
