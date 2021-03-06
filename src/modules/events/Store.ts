/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * License GNU General Public License version 2 or later;
 * Copyright 2013-2018 Valeriy Chupurnov https://xdsoft.net
 */

import { CallbackFunction, EventHandlerBlock, IDictionary } from '../../types';

export class EventHandlersStore {
    private __store: IDictionary<IDictionary<EventHandlerBlock[]>> = {};

    public get(event: string, namespace: string): EventHandlerBlock[] | void {
        if (this.__store[namespace] !== undefined) {
            return this.__store[namespace][event];
        }
    }

    public indexOf(
        event: string,
        namespace: string,
        originalCallback: CallbackFunction
    ): false | number {
        const blocks: EventHandlerBlock[] | void = this.get(event, namespace);

        if (blocks) {
            for (let i = 0; i < blocks.length; i += 1) {
                if (blocks[i].originalCallback === originalCallback) {
                    return i;
                }
            }
        }

        return false;
    }

    public namespaces(): string[] {
        return Object.keys(this.__store);
    }

    public events(namespace: string): string[] {
        return this.__store[namespace]
            ? Object.keys(this.__store[namespace])
            : [];
    }

    public set(
        event: string,
        namespace: string,
        data: EventHandlerBlock,
        onTop: boolean = false
    ) {
        if (this.__store[namespace] === undefined) {
            this.__store[namespace] = {};
        }

        if (this.__store[namespace][event] === undefined) {
            this.__store[namespace][event] = [];
        }

        if (!onTop) {
            this.__store[namespace][event].push(data);
        } else {
            this.__store[namespace][event].unshift(data);
        }
    }
}
