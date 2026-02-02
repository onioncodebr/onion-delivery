package br.com.onioncode.delivery.service;

import br.com.onioncode.delivery.domain.Motoboy;
import br.com.onioncode.delivery.dto.MotoboyCreateDTO;
import br.com.onioncode.delivery.dto.MotoboyUpdateDTO;
import br.com.onioncode.delivery.repository.TemporaryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class MotoboyService {

    private TemporaryRepository tpr = new TemporaryRepository();
    private AtomicLong contador = new AtomicLong(1);

    public Motoboy create(MotoboyCreateDTO dto) {
        Motoboy motoboy = new Motoboy(contador.getAndIncrement(), dto.getName(), dto.getPriceKM(), dto.getMinTaxa());
        TemporaryRepository.getMotoboyDataBase().add(motoboy);
        return motoboy;
    }

    public List<Motoboy> getAllMotoboys() {
        return TemporaryRepository.getMotoboyDataBase();
    }

    public List<Motoboy> getMotoboyByName(String param) {
        List<Motoboy> listFiltred = new ArrayList<>();
        List<Motoboy> list = TemporaryRepository.getMotoboyDataBase();
        for(int i = 0; i < list.size(); i++){
            if (TemporaryRepository.getMotoboyDataBase().get(i).getName().toLowerCase().contains(param.toLowerCase())){
                listFiltred.add(TemporaryRepository.getMotoboyDataBase().get(i));
            }
        }
        return listFiltred;

    }

    public Motoboy delete(Long id, MotoboyUpdateDTO dto){
        for (Motoboy motoboy : TemporaryRepository.getMotoboyDataBase()){
            if(motoboy.getId().equals(id)){
                TemporaryRepository.getMotoboyDataBase().remove(motoboy);
                return motoboy;
            }
        }
        return null;
    }

    public Motoboy update(Long id, MotoboyUpdateDTO dto) {
        Motoboy m = new Motoboy();
        for (int i = 0; i < TemporaryRepository.getMotoboyDataBase().size(); i++){
            if(TemporaryRepository.getMotoboyDataBase().get(i).getId().equals(id)){

                TemporaryRepository.getMotoboyDataBase().get(i).setName(dto.getName());
                TemporaryRepository.getMotoboyDataBase().get(i).setMinTaxa(dto.getMinTaxa());
                TemporaryRepository.getMotoboyDataBase().get(i).setPriceKM(dto.getPriceKM());
                m = TemporaryRepository.getMotoboyDataBase().get(i);
            }
        }
        return m;
    }

}
