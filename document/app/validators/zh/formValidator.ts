import type { Request } from '@adonisjs/core/http';
import vine, { SimpleMessagesProvider, VineValidator } from "@vinejs/vine";
import { validateFields, validateMessage } from "./lang.js";
export const validateMessagesProvider = (messages = {}, fields = {}) => {
  return {
    messagesProvider: new SimpleMessagesProvider({
      ...validateMessage,
      ...messages
    }, {
      ...validateFields,
      ...fields
    })
  }
}

// export const formValidator = <T extends Record<string, any>>(rules: T, messages = {}, fields = {}) => {
//   const validator = vine.compile(
//     vine.object(rules)
//   )
//   type SchemaType = ReturnType<typeof validator.validate>
//   const messageProvider = validateMessagesProvider(messages, fields)

//   return async (request: Request): Promise<SchemaType> => {
//     const result = await request.validateUsing(validator, messageProvider)
//     return result as SchemaType
//   }
// }

export class FormValidator<T extends Record<string, any>> {
  private validateFields: Record<string, any> = {}
  private validateMessages: Record<string, any> = {}
  private compile?: VineValidator<any, Record<string, any> | undefined>;

  static rules<D extends Record<string, any>>(rules: D) {
    const validate = vine.compile(
      vine.object(rules)
    )
    const instance = new FormValidator<ReturnType<typeof validate.validate>>()
    instance.compile = validate

    return instance
  }

  messages(messages: Record<string, any>) {
    this.validateMessages = messages
    return this;
  }

  fields(fields: Record<string, any>) {
    this.validateFields = fields
    return this;
  }

  async validate(request: Request): Promise<T> {
    const messageProvider = validateMessagesProvider(this.validateMessages, this.validateFields)
    const result = await request.validateUsing(this.compile!, messageProvider)
    return result as T
  }
}
