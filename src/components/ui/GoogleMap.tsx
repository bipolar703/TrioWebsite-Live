import React from 'react';

export default function GoogleMap() {
  return (
    <div className="google-maps rounded-lg overflow-hidden shadow-md border border-gray-100">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3712.274346095192!2d39.19119545033826!3d21.49892998570454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3cf6f2a146d2d%3A0x6c6be58a6e9e4c45!2z2KfZhNi02LHZg9ipINin2YTYq9mE2KfYq9mK2Kkg2YTZhNi32KfZgtipINin2YTYrdiv2YrYq9ip!5e0!3m2!1sar!2ssa!4v1701234567890!5m2!1sar!2ssa"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="موقع الشركة الثلاثية الحديثة للطاقة "
      />
    </div>
  );
} 