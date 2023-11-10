import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCarroseria'
})
export class FilterCarroseriaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost = [];
    for(const post of (value ?? [])){
      if(post.carroseria.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultPost.push(post);
      };
    };
    return resultPost;
  }

}
