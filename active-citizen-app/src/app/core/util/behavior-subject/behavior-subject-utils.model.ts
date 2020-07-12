import { BehaviorSubject } from 'rxjs';

export class BehaviorSubjectUtils {

  static next<T>(behaviorSubject: BehaviorSubject<T>, value: T): BehaviorSubject<T> {
    if (behaviorSubject) {
      behaviorSubject.next(value);
    } else {
      behaviorSubject = new BehaviorSubject<T>(value);
    }
    return behaviorSubject;
  }

  static ifFirst<T>(behaviorSubject: BehaviorSubject<T>, value: T): BehaviorSubject<T> {
    if (!behaviorSubject) {
      behaviorSubject = new BehaviorSubject<T>(value);
    }
    return behaviorSubject;
  }

}
