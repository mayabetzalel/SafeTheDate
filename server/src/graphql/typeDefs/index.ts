import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  eventName?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  responseMessage: Scalars['String'];
  to?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['Upload']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ticketsAmount?: Maybe<Scalars['Int']>;
  timeAndDate?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
};

export type FilterEventParams = {
  from?: InputMaybe<Scalars['Float']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['Float']>;
};

export type InputEvent = {
  image?: InputMaybe<Scalars['Upload']>;
  location: Scalars['String'];
  name: Scalars['String'];
  ticketsAmount: Scalars['Int'];
  timeAndDate: Scalars['Float'];
  type: Scalars['String'];
};

export type InputMessage = {
  message: Scalars['String'];
};

export type InputTicket = {
  _id: Scalars['ID'];
  barcode: Scalars['String'];
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  chatCommand: ChatResponse;
  createEvent: MutationResponse;
  createTicket: MutationResponse;
  generateTicketForCurrentEvent: ThirdPartyTicket;
};


export type MutationChatCommandArgs = {
  inputMessage: InputMessage;
};


export type MutationCreateEventArgs = {
  inputEvent: InputEvent;
};


export type MutationCreateTicketArgs = {
  inputTicket: InputTicket;
};


export type MutationGenerateTicketForCurrentEventArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  code: Scalars['Int'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  event: Array<Event>;
  eventCount: Scalars['Int'];
  isVallid: Scalars['Boolean'];
  query?: Maybe<Scalars['String']>;
  validateTicket: ThirdPartyTicket;
};


export type QueryEventArgs = {
  filterParams?: InputMaybe<FilterEventParams>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryEventCountArgs = {
  filterParams?: InputMaybe<FilterEventParams>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryIsVallidArgs = {
  barcode: Scalars['String'];
  eventId: Scalars['ID'];
};


export type QueryValidateTicketArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type ThirdPartyTicket = {
  __typename?: 'ThirdPartyTicket';
  eventName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  ownerEmail?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  qrCodeId?: Maybe<Scalars['String']>;
};

export type Ticket = {
  __typename?: 'Ticket';
  _id?: Maybe<Scalars['ID']>;
  barcode?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ChatResponse: ResolverTypeWrapper<ChatResponse>;
  Event: ResolverTypeWrapper<Event>;
  FilterEventParams: FilterEventParams;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InputEvent: InputEvent;
  InputMessage: InputMessage;
  InputTicket: InputTicket;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ThirdPartyTicket: ResolverTypeWrapper<ThirdPartyTicket>;
  Ticket: ResolverTypeWrapper<Ticket>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ChatResponse: ChatResponse;
  Event: Event;
  FilterEventParams: FilterEventParams;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  InputEvent: InputEvent;
  InputMessage: InputMessage;
  InputTicket: InputTicket;
  Int: Scalars['Int'];
  Mutation: {};
  MutationResponse: MutationResponse;
  Query: {};
  String: Scalars['String'];
  ThirdPartyTicket: ThirdPartyTicket;
  Ticket: Ticket;
  Upload: Scalars['Upload'];
};

export type ChatResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatResponse'] = ResolversParentTypes['ChatResponse']> = {
  eventName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responseMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Upload']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ticketsAmount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timeAndDate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  chatCommand?: Resolver<ResolversTypes['ChatResponse'], ParentType, ContextType, RequireFields<MutationChatCommandArgs, 'inputMessage'>>;
  createEvent?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'inputEvent'>>;
  createTicket?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationCreateTicketArgs, 'inputTicket'>>;
  generateTicketForCurrentEvent?: Resolver<ResolversTypes['ThirdPartyTicket'], ParentType, ContextType, Partial<MutationGenerateTicketForCurrentEventArgs>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  event?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, Partial<QueryEventArgs>>;
  eventCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryEventCountArgs>>;
  isVallid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryIsVallidArgs, 'barcode' | 'eventId'>>;
  query?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validateTicket?: Resolver<ResolversTypes['ThirdPartyTicket'], ParentType, ContextType, Partial<QueryValidateTicketArgs>>;
};

export type ThirdPartyTicketResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThirdPartyTicket'] = ResolversParentTypes['ThirdPartyTicket']> = {
  eventName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  qrCodeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TicketResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ticket'] = ResolversParentTypes['Ticket']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  barcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eventId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  ChatResponse?: ChatResponseResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ThirdPartyTicket?: ThirdPartyTicketResolvers<ContextType>;
  Ticket?: TicketResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};

