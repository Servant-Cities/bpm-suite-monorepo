// Should we use this or symbols ? And should we type a dictionary in an sdk ?
export type TranslationKey<Key extends string> = Key;

// Should we use ids or objects to handle relationships in js sdk ?
export type ScenarioLink = string;
export type Scenario = {
    id: string;
    name: string;
    activities: Array<ActivityLink>;
}

// Should we add two relationships for next and previous or a link object ?
export type ActivityLink = string;
export type Activity = {
    id: string;
    name: string;
    scenarios: Array<ScenarioLink>;
    nextActivities: Array<ActivityLink>;
    previousActivities: Array<ActivityLink>;
    trigger: Trigger;
    controlList: Array<string>;
    outputModel: Model;
}

export type Trigger = TranslationKey<"START"> | TranslationKey<"AND"> | TranslationKey<'OR'> | TranslationKey<'XOR'>;

export type Model = { [Key: string] : SupportedType}
export type SupportedType = Model | TranslationKey<'String'> | TranslationKey<'Boolean'> | TranslationKey<'Datetime'> | TranslationKey<'Number'>