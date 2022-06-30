import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    let error = new Error(`Error while fetching data ${res.json()} ${res.status} ${res.statusText}`);
    throw error;
  }
  return res.json();
}


export function useUser({ redirectTo, redirectIfFound, allowed_roles } = {}) {
  const { data, error } = useSWR('/api/user', fetcher, { dedupingInterval: 100, })
  const user = data?.user
  const finished = Boolean(data)
  const hasUser = Boolean(user)
  const hasError = Boolean(error);

  useEffect(() => {
    if (hasError) {
      if (redirectTo) {
        Router.push(redirectTo);
      } else {
        Router.push('/')
      }
    }
    if (!redirectTo || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
    if (redirectTo && hasUser && allowed_roles) {
      let roles = user.roles.filter((role: string) => allowed_roles.includes(role));
      if (roles <= 0) {
        Router.push(redirectTo);
      }
    }
  }, [redirectTo, redirectIfFound, finished, hasUser, hasError, hasError])
  return error ? null : user
}
