package br.com.onioncode.delivery.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicLong;

@Service
public class EntregaService {
    @Autowired
    private ListaDeEntregaService listaDeEntregaService;
    private AtomicLong contador = new AtomicLong(1);

}
