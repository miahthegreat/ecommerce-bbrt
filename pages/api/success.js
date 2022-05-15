import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    const items = await stripe.checkout.sessions.listLineItems(
      req.query.session_id
    );

    res.status(200).json({ session, items });
  } catch (error) {
    console.log(error);
  }
}
