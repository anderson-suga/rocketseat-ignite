import { v4 as uuiV4 } from "uuid";

class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuiV4();
    }
  }
}

export { Category };
