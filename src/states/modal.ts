import { BehaviorSubject } from "rxjs";

const $modal = new BehaviorSubject(false)

const handleModal = () => {
    $modal.next(!$modal.getValue())
}

export {$modal, handleModal}