import { useId, useState } from 'react'
import { CartIcon, ClearCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'
import './Cart.css'

export function CartItem({
  thumbnail,
  price,
  title,
  quantity,
  addProductToCart,
  reduceProductFromCart,
}) {
  return (
    <li>
      <img src={thumbnail} alt={title} />

      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <button onClick={reduceProductFromCart}>-</button>
        <small> Cantidad {quantity}</small>
        <button onClick={addProductToCart}>+</button>
      </footer>
    </li>
  )
}

export function Cart() {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart, reduceFromCart, total } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleChange = (event) => {
    setIsCartOpen(event.target.checked)
  }

  return (
    <>
      <label htmlFor={cartCheckboxId} className="cart-button">
        {cart.length > 0 && !isCartOpen && <span>{cart.length}</span>}
        <CartIcon />
      </label>
      <input
        type="checkbox"
        id={cartCheckboxId}
        hidden
        onChange={handleChange}
      />

      <aside className="cart">
        <ul>
          {cart.map((product) => {
            return (
              <CartItem
                key={product.id}
                {...product}
                addProductToCart={() => addToCart(product)}
                reduceProductFromCart={() => reduceFromCart(product)}
              />
            )
          })}
        </ul>

        {cart.length > 0 && (
          <footer>
            <p className="total-price">Total: $ {total}</p>
            <button onClick={clearCart} className="clear-cart">
              <ClearCartIcon />
            </button>
          </footer>
        )}
      </aside>
    </>
  )
}
