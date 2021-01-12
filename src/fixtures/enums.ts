enum Status {
  INITIAL = "INITIAL",
  STARTED = "STARTED",
  STOPPED = "INTERUPT",
  PAGE_LOADED = "PAGE_LOADED",
  LOGGED_IN = "LOGGED_IN",
  CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS",
  ADD_TO_CART = "ADD_TO_CART",
  INIT_CHECKOUT = "INIT_CHECKOUT",
  SELECT_DELIVERY = "SELECT_DELIVERY",
  INPUT_DELIVERY_ADDRESS = "INPUT_DELIVERY_ADDRESS",
  PAYMENT = "PAYMENT"
}

enum NextTask {
  STOP = "STOP",
  NEXT = "NEXT",
  PREVIOUS = "PREVIOUS",
  FIRST = "FIRST",
  LAST = "LAST",
  SAME = "SAME"
}



enum SearchTypes {
  ALBUM = "album",
  ARTIST = "artist",
  PLAYLIST = "playlist",
  TRACK = "track",
  SHOW = "show",
  EPISODE= "episode"

}
export { Status, NextTask, SearchTypes };
