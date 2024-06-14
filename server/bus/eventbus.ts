import {
  IEventBus,
  EvntBusAction,
  Disposable,
  ChatBusMsgHandler,
  SubscriptionOptions
} from "../contract.ts";


class EvntBus implements IEventBus {
  private subscribedList: Subscriber[] = [];

  notify(newMessage: EvntBusAction): Promise<void> {
    this.subscribedList.forEach(subscriber => {
      subscriber.handler(newMessage)
    })

    return Promise.resolve()
  }

  action<T extends EvntBusAction["type"], Payload = Extract<EvntBusAction, { type: T }>["payload"]>(type: T, payload: Payload): EvntBusAction {
    return {
      type,
      payload
    } as { type: T, payload: Payload }
  }

  async subscribe(options: SubscriptionOptions, handler: ChatBusMsgHandler): Promise<Disposable> {
    const subscriber = {
      options,
      handler
    }

    this.subscribedList.push(subscriber)

    return {
      dispose: () => {
        this.subscribedList.splice(
          this.subscribedList.indexOf(subscriber),
          1
        )
      }
    }
  }
}

export default new EvntBus()

// --
// Internal
// --

type Subscriber = {
  options: SubscriptionOptions,
  handler: ChatBusMsgHandler
}