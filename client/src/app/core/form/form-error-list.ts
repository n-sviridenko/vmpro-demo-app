import * as _ from 'lodash';

export interface FormErrorListChildren {
  [fieldName: string]: FormErrorList;
}

export class FormErrorList {
  public errors: string[] = [];

  public children: FormErrorListChildren = {};

  public addChild(fieldName: string, child: FormErrorList) {
    this.children[fieldName] = child;
  }

  public hasChildren(): boolean {
    return !_.isEmpty(this.children);
  }
}
