

export const TopicActions = ['seeTopic', 'viewPartitions', 'viewMessages', 'viewConsumers', 'viewConfig'] as const;
export type TopicAction = 'all' | typeof TopicActions[number];

export class TopicDetail {
    topicName: string;
    isInternal: boolean;
    partitionCount: number;
    replicationFactor: number;
    cleanupPolicy: string;
    logDirSize: number; // how much space this topic takes up (files in its log dir)
    allowedActions: TopicAction[] | undefined;

    // Added by frontend
    // messageCount: number;
}

export class GetTopicsResponse {
    topics: TopicDetail[];
}

export interface Partition {
    id: number;
    waterMarkLow: number;
    waterMarkHigh: number;
}

export interface GetPartitionsResponse {
    topicName: string;
    partitions: Partition[];
}


export interface TopicConsumer {
    groupId: string
    summedLag: number
}

export interface GetTopicConsumersResponse {
    topicName: string;
    topicConsumers: TopicConsumer[];
}




export interface TopicMessage {
    offset: number,
    timestamp: number,
    partitionID: number,
    key: string, // base64 encoded key of the message
    value: any, // json representation of the message value (xml, avro, etc will get converted)
    valueType: 'json' | 'xml' | 'avro' | 'text' | 'binary', // actual format the message (before being converted to json)
    size: number, // size in bytes of the kafka message
    isValueNull: boolean,

    // Added by the frontend (sometimes)
    valueJson: string,
    valueBinHexPreview: string,
}

export interface ListMessageResponse {
    elapsedMs: number,
    fetchedMessages: number,
    isCancelled: boolean,
    messages: TopicMessage[],
}

export interface GetTopicMessagesResponse {
    kafkaMessages: ListMessageResponse,
}





export interface TopicConfigEntry {
    name: string,
    value: string,
    isDefault: boolean,
}
export interface TopicDescription {
    topicName: string
    configEntries: TopicConfigEntry[]
}
export interface TopicConfigResponse {
    topicDescription: TopicDescription
}






export interface GroupMemberAssignment {
    topicName: string;
    partitionIds: number[];

}
export interface GroupMemberDescription {
    id: string; // unique ID assigned to the member after login
    clientId: string; // custom id reported by the member
    clientHost: string; // address/host of the connection
    assignments: GroupMemberAssignment[]; // topics+partitions that the worker is assigned to

}


export const GroupActions = ['seeConsumerGroup'] as const;
export type GroupAction = 'all' | typeof GroupActions[number];

export interface GroupDescription {
    groupId: string; // name of the group
    state: string; // Dead, Initializing, Rebalancing, Stable
    protocolType: string; // Will be "consumer" if we can decode the members; otherwise ".members" will be empty, which happens for "sr" (for schema registry) for example
    members: GroupMemberDescription[]; // members (consumers) that are currently present in the group
    coordinatorId: number;
    lag: GroupLagDescription;
    allowedActions: GroupAction[];

    // Computed by frontend
    lagSum: number;
}

export interface GroupLagDescription {
    groupId: string;
    topicLags: TopicLag[];
}

export interface TopicLag {
    topic: string; // name
    summedLag: number;

    partitionCount: number; // number of partitions the topic has
    partitionsWithOffset: number; // number of partitions that have an active offset in this group

    // only lists partitions that have a commited offset (independent of whether or not a member is currently assigned to it)
    partitionLags: { lag: number, partitionId: number }[]
}

export interface GetConsumerGroupsResponse {
    consumerGroups: GroupDescription[];
}







export interface Broker {
    brokerId: number;
    logDirSize: number; // bytes of the whole directory
    address: string;
    rack: string;
}

export interface ClusterInfo {
    brokers: Broker[];
    controllerId: number;
}

export interface ClusterInfoResponse {
    clusterInfo: ClusterInfo;
}



// Current user
export interface User {
    id: string,
    internalIdentifier: string,
    providerID: number,
    providerName: string,
    meta: {
        email: string,
        name: string,
        avatarUrl: string,
    },
}
export interface Seat {
    id: string, // id of seat
    licenseId: string, // shouldn't that be censored??
    user: User, // user representation of firestore? should be removed...
    lastActivity: string, // is a datetime string, should probably be a "UnixMillis"
}
export interface UserData {
    user: User;
    seat: Seat;
    canManageKowl: boolean,
}



export interface Permission {
    resource: string;
    includes: string[] | undefined;
    excludes: string[] | undefined;
    allowedActions: string[] | undefined;
}
export interface Role {
    name: string;
    permissions: Permission[];
}
export interface UserDetails {
    name: string;
    loginProvider: string;
    roleNames: string[];
    //seat: Seat; // seat this user occupies

    // resolved by frontend, not transmitted!
    roles: Role[];
}
export interface LoginProviderGroup {
    name: string;
    provider: string;
    userNames: string[];
}
export interface SubjectDefinition {
    kind: 'user' | 'group';
    provider: string; // github or google, in various casings...
    name: string; // name of the person or group
    organization: string | undefined; // for github teams
}
export interface RoleBinding {
    metadata: object;
    subjects: SubjectDefinition[];
    roleName: string;
}
// AdminInfo = all users and their roles, permissions; all login methods, ...
export interface AdminInfo {
    users: UserDetails[];
    roles: Role[]; // list of all roles
    groups: LoginProviderGroup[];
    roleBindings: RoleBinding[];
}