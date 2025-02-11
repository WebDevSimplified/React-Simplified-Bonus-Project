import { stripePromise } from "@/lib/stripe"
import { LoaderFunctionArgs } from "react-router"

export function loader({ request: { url } }: LoaderFunctionArgs) {
  const searchParams = new URL(url).searchParams
  const clientSecret = searchParams.get("payment_intent_client_secret")

  return {
    messagePromise: stripePromise.then(stripe => {
      if (stripe == null || clientSecret == null) {
        return "Something went wrong"
      }

      return stripe
        .retrievePaymentIntent(clientSecret)
        .then(({ paymentIntent }) => {
          switch (paymentIntent?.status) {
            case "succeeded":
              return "Payment succeeded"
            case "processing":
              return "Your payment is processing"
            case "requires_payment_method":
              return "Your payment was not successful, please try again"
            default:
              return "Something went wrong"
          }
        })
    }),
  }
}
