interface IDynamicStyle {
    (props: any): string;
}

interface IApiEvent {
    (props: any): Promise<any>;
}

interface IEventFunction {
    (props: any): any;
}

export interface IDynamicStyles {
    [key: string]: IDynamicStyle;
}

export interface IApiEvents {
    [key: string]: IApiEvent;
}

export interface IEvents {
    [key: string]: IEventFunction;
}

export class PageOrchestrator<
    TDynamicStyles extends IDynamicStyles,
    TApiEvents extends IApiEvents,
    TEvents extends IEvents
> {
    private dynamicStyles: TDynamicStyles;
    private apiEvents: TApiEvents;
    private events: TEvents;

    constructor(
        dynamicStyles: TDynamicStyles,
        apiEvents: TApiEvents,
        events: TEvents
    ) {
        this.dynamicStyles = dynamicStyles;
        this.apiEvents = apiEvents;
        this.events = events;
    }

    async triggerApiEvent<K extends keyof TApiEvents>(
        eventKey: K,
        props: Parameters<TApiEvents[K]>[0]
    ): Promise<ReturnType<TApiEvents[K]>> {
        const apiFn = this.apiEvents[eventKey];
        if (apiFn) {
            return await apiFn(props);
        }
        throw new Error(`API event "${String(eventKey)}" not found.`);
    }

    triggerEvent<K extends keyof TEvents>(
        eventKey: K,
        props: Parameters<TEvents[K]>[0]
    ): ReturnType<TEvents[K]> {
        const eventFn = this.events[eventKey];
        if (eventFn) {
            return eventFn(props);
        }
        throw new Error(`Event "${String(eventKey)}" not found.`);
    }

    getDynamicStyle<K extends keyof TDynamicStyles>(
        styleKey: K,
        props: Parameters<TDynamicStyles[K]>[0]
    ): string {
        const styleFn = this.dynamicStyles[styleKey];
        if (styleFn) {
            return styleFn(props);
        }
        throw new Error(`Dynamic style "${String(styleKey)}" not found.`);
    }
}