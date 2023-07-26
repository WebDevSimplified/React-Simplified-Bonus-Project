import { ReactNode } from "react"
import {
  LoaderFunctionArgs,
  defer,
  useLoaderData,
  Await as AwaitReactRouter,
  AwaitProps as AwaitPropsReactRouter,
} from "react-router-dom"

export function deferredLoader<T extends Record<string, unknown>>(
  dataFunc: (args: LoaderFunctionArgs) => T
) {
  return (args: LoaderFunctionArgs) => {
    return defer(dataFunc(args)) as Omit<ReturnType<typeof defer>, "data"> & {
      data: T
    }
  }
}

export function useDeferredLoaderData<
  T extends ReturnType<typeof deferredLoader>
>() {
  return useLoaderData() as ReturnType<T>["data"]
}

type AwaitProps<T> = Omit<AwaitPropsReactRouter, "children" | "resolve"> & {
  children: (data: Awaited<T>) => ReactNode
  resolve: Promise<T>
}

export function Await<T>(props: AwaitProps<T>) {
  return <AwaitReactRouter {...props} />
}
