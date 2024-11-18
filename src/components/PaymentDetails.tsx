import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPaymentDetails } from '../services/apiService';

const PaymentDetails = () => {
  const { token_ws } = useParams();
  const navigate = useNavigate();
  interface PaymentDetails {
    nombre_instalacion: string;
    monto: number;
    estado: string;
    fecha_pago: string;
    instalacion_bloque_periodico_id: number;
    id_instalacion: number;
  }

  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchPaymentDetails(token_ws!);
        setDetails(data);
      } catch {
        setError('Error al cargar los detalles del pago.');
      }
    };

    fetchDetails();
  }, [token_ws]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!details) {
    return <p>Cargando detalles del pago...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Detalles del Pago</h2>
      <p><strong>Instalación:</strong> {details.nombre_instalacion}</p>
      <p><strong>Monto:</strong> ${details.monto}</p>
      <p><strong>Estado:</strong> {details.estado}</p>
      <p><strong>Fecha de Pago:</strong> {details.fecha_pago}</p>
      <button
        onClick={() => navigate(`/instalacion/${details.id_instalacion}`)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Volver a la instalación
      </button>
    </div>
  );
};

export default PaymentDetails;
