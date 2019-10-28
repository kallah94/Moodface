package com.mycompany.myapp.domain.myclass;

import java.io.Serializable;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.mycompany.myapp.domain.Mood;
import com.mycompany.myapp.domain.enumeration.Moods;

public class MoodBoard implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private String currentday;
    private List<Long> listmood;
    private List<String> listcomment;


    public MoodBoard(String currentday, List<Long> listmood, List<String> listcomment){
        this.currentday = currentday;
        this.listmood = listmood;
        this.listcomment = listcomment;
    }

    public void setcurrentday(String currentday){
        this.currentday = currentday;
    }

    public String getcurrentday(){
        return this.currentday;
    }

    public void setlistmood(List<Long> listmood){
        this.listmood = listmood;
    }

    public List<Long> getlistmood(){
        return this.listmood;
    }

    public List<String> getlistcomment(){
        return this.listcomment;
    }

    public void setlistcomment(List<String> listcomment){
        this.listcomment = listcomment;
    }

    public static List<LocalDate> listedate(){
        List<LocalDate> listdates = new ArrayList<>();
        LocalDate currentdate = LocalDate.now();
        while ((currentdate.getDayOfWeek() != DayOfWeek.SATURDAY) && (currentdate.getDayOfWeek() !=DayOfWeek.SUNDAY))
            {
            listdates.add(currentdate);
            currentdate = currentdate.minusDays(1);
        };
        Collections.reverse(listdates);
        return listdates;
    }

    public static List<LocalDate> DateLines() {
        List<LocalDate> datelines = new ArrayList<>();
        datelines.add(listedate().get(0));
        datelines.add(listedate().get(listedate().size()-1));
        return datelines;
    }

    public static List<Long> Filtermood(List<Mood> moods) {
        Long som = 0L;
        List<Long> list = new ArrayList<>();
        List<Mood> listtampon = new ArrayList<>();
        for(Moods Mood : Moods.values()) {
            listtampon.addAll(moods);
            listtampon.removeIf(mood -> mood.getMood() != Mood);
            list.add((long) listtampon.size());
            som += (long) listtampon.size();
        }
        list.add(som);
        return list;
    }
}