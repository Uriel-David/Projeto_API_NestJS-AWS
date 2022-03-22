import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class jogadoresValidacaoParamentrosPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        //console.log(`value: ${value} and metadata: ${metadata.type}`);
        
        if(!value) {
            throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado.`);
        }

        return value;
    }
}