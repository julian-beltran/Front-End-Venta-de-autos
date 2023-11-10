import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterModelo'
})
export class FilterModeloPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost = [];
    for(const post of (value ?? [])){
      if(post.modelo.toString().indexOf(arg)>-1){
        resultPost.push(post);
      };
    };
    return resultPost;
  }

}
