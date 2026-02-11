package br.com.onioncode.delivery.service;

import br.com.onioncode.delivery.domain.Motoboy;
import br.com.onioncode.delivery.dto.motoboy.MotoboyCreateDTO;
import br.com.onioncode.delivery.dto.motoboy.MotoboyUpdateDTO;
import br.com.onioncode.delivery.repository.MotoboyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MotoboyService {

    private final MotoboyRepository motoboyRepository;

    public List<Motoboy> findAll() {
        return motoboyRepository.findAll();
    }

    public Motoboy save(MotoboyCreateDTO dto) {
        Motoboy motoboy = new Motoboy(dto.getName(), dto.getPriceKM(), dto.getMinTaxa());
        return motoboyRepository.save(motoboy);
    }

    public Motoboy findById(Long id) {
        return motoboyRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public List<Motoboy> findByName(String param) {
        return motoboyRepository.findByNameContainingIgnoreCase(param);
    }

    public void delete(Long id){
        motoboyRepository.deleteById(findById(id).getId());
    }

    public Motoboy update(Long id, MotoboyUpdateDTO dto) {
        Motoboy motoboy = findById(id);
        motoboy.setName(dto.getName());
        motoboy.setMin_taxa(dto.getMinTaxa());
        motoboy.setPrice_km(dto.getPriceKM());
        return motoboyRepository.save(motoboy);
    }
}

