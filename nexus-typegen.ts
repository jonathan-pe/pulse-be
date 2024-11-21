/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  User: { // root type
    email?: string | null; // String
    id: string; // ID!
    name?: string | null; // String
  }
  UserStats: { // root type
    correctPredictions: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    currentStreak: number; // Int!
    id: string; // ID!
    longestStreak: number; // Int!
    points: number; // Int!
    totalPredictions: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createUser: NexusGenRootTypes['User'] | null; // User
    createUserStats: NexusGenRootTypes['UserStats'] | null; // UserStats
    updateUserStats: NexusGenRootTypes['UserStats'] | null; // UserStats
  }
  Query: { // field return type
    userById: NexusGenRootTypes['User'] | null; // User
    userStatsByUserId: NexusGenRootTypes['UserStats'] | null; // UserStats
  }
  User: { // field return type
    email: string | null; // String
    id: string; // ID!
    name: string | null; // String
  }
  UserStats: { // field return type
    correctPredictions: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    currentStreak: number; // Int!
    id: string; // ID!
    longestStreak: number; // Int!
    points: number; // Int!
    totalPredictions: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createUser: 'User'
    createUserStats: 'UserStats'
    updateUserStats: 'UserStats'
  }
  Query: { // field return type name
    userById: 'User'
    userStatsByUserId: 'UserStats'
  }
  User: { // field return type name
    email: 'String'
    id: 'ID'
    name: 'String'
  }
  UserStats: { // field return type name
    correctPredictions: 'Int'
    createdAt: 'DateTime'
    currentStreak: 'Int'
    id: 'ID'
    longestStreak: 'Int'
    points: 'Int'
    totalPredictions: 'Int'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      email?: string | null; // String
      name?: string | null; // String
    }
    createUserStats: { // args
      correctPredictions?: number | null; // Int
      currentStreak?: number | null; // Int
      longestStreak?: number | null; // Int
      points?: number | null; // Int
      totalPredictions?: number | null; // Int
      userId?: string | null; // String
    }
    updateUserStats: { // args
      correctPredictions?: number | null; // Int
      currentStreak?: number | null; // Int
      longestStreak?: number | null; // Int
      points?: number | null; // Int
      totalPredictions?: number | null; // Int
      userId?: string | null; // String
    }
  }
  Query: {
    userById: { // args
      id?: string | null; // String
    }
    userStatsByUserId: { // args
      userId?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}