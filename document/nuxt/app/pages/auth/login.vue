<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const toast = useToast()

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'text',
  label: '帐号',
  placeholder: '请输入帐号',
  required: true
}, {
  name: 'password',
  label: '密码',
  type: 'password',
  placeholder: '请输入登录密码',
  required: true
}]

const schema = z.object({
  email: z.email('请输入正确的邮箱格式'),
  password: z.string('请输入密码').min(8, '密码不能少于8个字符')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4 mt-32">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="登录"
        description="请输入帐号和密码"
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
      >
        <template #footer>
          访问<ULink to="/">首页</ULink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
