import {CategoryDto} from "./category-dto";
import {State} from "@ngxs/store";
import {Injectable} from "@angular/core";

@State<CategoryDto>({
  name: 'category'
})
@Injectable()
export class CategoryState {
}

