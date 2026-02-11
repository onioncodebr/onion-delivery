package br.com.onioncode.delivery.service;

import br.com.onioncode.delivery.domain.Diaria;
import br.com.onioncode.delivery.domain.Motoboy;
import br.com.onioncode.delivery.dto.diaria.DiariaResponseDTO;
import br.com.onioncode.delivery.repository.DiariaRepository;
import br.com.onioncode.delivery.repository.MotoboyRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiariaService {
    private final MotoboyService motoboyService;
    private final DiariaRepository diariaRepository;
    private final MotoboyRepository motoboyRepository;

    public DiariaResponseDTO save(Long id) {
        Motoboy motoboy = motoboyService.findById(id);
        if (motoboy == null) {
            throw new EntityNotFoundException("Motoboy not found");
        }
        LocalDate now = LocalDate.now();
            for (Diaria diaria : motoboy.getListaDeDiarias()) {
                if (diaria.getDate().equals(now)) {
                    return new DiariaResponseDTO(diaria.getId(), diaria.getDate(),
                            diaria.getLista(), diaria.getMotoboy().getName());
                }
            }
        Diaria diaria = diariaRepository.save(new Diaria(now, motoboy));
            return new DiariaResponseDTO(diaria.getId(), diaria.getDate(), diaria.getLista(),
                    diaria.getMotoboy().getName());
    }
    public Diaria findById(long id) {
        return diariaRepository.findById(id);
    }


    public List<DiariaResponseDTO> getByMotoboy(Long motoboyId) {
        Motoboy motoboy = motoboyService.findById(motoboyId);

        if(motoboy == null){
            throw new EntityNotFoundException("Motoboy not found");
        }

        List<Diaria> diarias = diariaRepository.getDiariasByMotoboy(motoboy);

        List<DiariaResponseDTO> responseList = new ArrayList<>();
        for(Diaria diaria : diarias){
            responseList.add(toResponse(diaria));
        }
        return responseList;
    }

    public DiariaResponseDTO toResponse(Diaria diaria) {
        DiariaResponseDTO diariaResponseDTO = new DiariaResponseDTO();
        diariaResponseDTO.setId(diaria.getId());
        diariaResponseDTO.setDate(diaria.getDate());
        diariaResponseDTO.setLista(diaria.getLista());
        diariaResponseDTO.setMotoboyName(diaria.getMotoboy().getName());
        return diariaResponseDTO;
    }
}

