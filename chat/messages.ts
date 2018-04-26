



@Component
export class Messages(){


    contructor MEssages(room : Room)

    sendMessage()

    ngOnInit(){

    }
}

Enum attachement_type { text, file, pic};

class Message{
  sender:string;
  zdate:date;
  body:  {
      content:
      type:attachement_type
  }

}
