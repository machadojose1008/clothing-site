import './cart-dropdown.styles.scss';
import Button from '../button/button.component';


const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-itens'/>

            <Button>Finalizar Compra</Button>
        </div>
    )

};

export default CartDropdown;