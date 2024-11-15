import icons from './icon'

const { AiFillStar, AiOutlineStar } = icons
// export const formatMoney = (number) => Number(number.toFixed(1)).toLocaleString();

export const formatMoney = (number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);

export const renderStartFromNumber = (number, size) => {
    const stars = [];
    for (let index = 0; index < +number; index++) {
        stars.push(<AiFillStar key={`filled-${index}`} color='orange' size={size || 14} />);
    }
    for (let index = 5; index > +number; index--) {
        stars.push(<AiOutlineStar key={`outline-${index}`} color='orange' size={size || 14} />);
    }
    return stars;
};
