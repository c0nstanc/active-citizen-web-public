import { Subscription } from 'rxjs';

export class SubscriptionUtils {

  public static unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
