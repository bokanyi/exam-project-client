import { BehaviorSubject } from "rxjs";

type Modal ={
    open: boolean,
    content: string
}
const $modal = new BehaviorSubject<Modal>({
    open: false,
    content: ""

})

const handleModal = (content: string) => {
    $modal.next({open: !$modal.getValue().open, content: content})
}

export {$modal, handleModal}