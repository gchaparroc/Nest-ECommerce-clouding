import { User } from './../entity/user.entity';
import { Product} from './../../products/entity/product.entity';

export class Order {
    date: Date;
    user: User;
    products: Product[];
}